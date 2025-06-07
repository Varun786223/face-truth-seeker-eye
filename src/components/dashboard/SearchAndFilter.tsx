
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Filter, SortAsc, SortDesc, X, Star, BookmarkPlus } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";

interface SearchAndFilterProps {
  onSearch: (query: string) => void;
  onFilter: (filters: FilterOptions) => void;
  onSort: (sortBy: string, direction: "asc" | "desc") => void;
  onBookmark: (id: string) => void;
}

interface FilterOptions {
  types: string[];
  results: string[];
  confidence: { min: number; max: number };
  dateRange: { start?: Date; end?: Date };
}

export function SearchAndFilter({ onSearch, onFilter, onSort, onBookmark }: SearchAndFilterProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [activeFilters, setActiveFilters] = useState<FilterOptions>({
    types: [],
    results: [],
    confidence: { min: 0, max: 100 },
    dateRange: {}
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch(query);
  };

  const toggleSort = () => {
    const newDirection = sortDirection === "asc" ? "desc" : "asc";
    setSortDirection(newDirection);
    onSort(sortBy, newDirection);
  };

  const toggleFilter = (category: keyof FilterOptions, value: string) => {
    if (category === "types" || category === "results") {
      setActiveFilters(prev => ({
        ...prev,
        [category]: prev[category].includes(value)
          ? prev[category].filter(item => item !== value)
          : [...prev[category], value]
      }));
    }
  };

  const clearFilters = () => {
    setActiveFilters({
      types: [],
      results: [],
      confidence: { min: 0, max: 100 },
      dateRange: {}
    });
    onFilter({
      types: [],
      results: [],
      confidence: { min: 0, max: 100 },
      dateRange: {}
    });
  };

  const hasActiveFilters = activeFilters.types.length > 0 || activeFilters.results.length > 0;

  const fileTypes = [
    { value: "image", label: "Images" },
    { value: "video", label: "Videos" },
    { value: "webcam", label: "Webcam" }
  ];

  const resultTypes = [
    { value: "authentic", label: "Authentic" },
    { value: "modified", label: "Modified" },
    { value: "inconclusive", label: "Inconclusive" }
  ];

  const sortOptions = [
    { value: "date", label: "Date" },
    { value: "confidence", label: "Confidence" },
    { value: "filename", label: "File Name" },
    { value: "result", label: "Result" }
  ];

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search analysis history..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filter Button */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filters
                {hasActiveFilters && (
                  <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-full p-0 text-xs">
                    {activeFilters.types.length + activeFilters.results.length}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Filters</h4>
                  {hasActiveFilters && (
                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                      Clear all
                    </Button>
                  )}
                </div>

                {/* File Type Filters */}
                <div>
                  <h5 className="text-sm font-medium mb-2">File Types</h5>
                  <div className="space-y-2">
                    {fileTypes.map((type) => (
                      <div key={type.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={`type-${type.value}`}
                          checked={activeFilters.types.includes(type.value)}
                          onCheckedChange={() => toggleFilter("types", type.value)}
                        />
                        <label htmlFor={`type-${type.value}`} className="text-sm">
                          {type.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Result Filters */}
                <div>
                  <h5 className="text-sm font-medium mb-2">Results</h5>
                  <div className="space-y-2">
                    {resultTypes.map((result) => (
                      <div key={result.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={`result-${result.value}`}
                          checked={activeFilters.results.includes(result.value)}
                          onCheckedChange={() => toggleFilter("results", result.value)}
                        />
                        <label htmlFor={`result-${result.value}`} className="text-sm">
                          {result.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Sort Button */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2">
                {sortDirection === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
                Sort
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48">
              <div className="space-y-2">
                <h4 className="font-medium">Sort by</h4>
                {sortOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant={sortBy === option.value ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => {
                      setSortBy(option.value);
                      onSort(option.value, sortDirection);
                    }}
                  >
                    {option.label}
                  </Button>
                ))}
                <div className="border-t pt-2">
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2"
                    onClick={toggleSort}
                  >
                    {sortDirection === "asc" ? <SortDesc className="h-4 w-4" /> : <SortAsc className="h-4 w-4" />}
                    {sortDirection === "asc" ? "Descending" : "Ascending"}
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Bookmark All Button */}
          <Button variant="outline" className="gap-2">
            <BookmarkPlus className="h-4 w-4" />
            Bookmark All
          </Button>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mt-4">
            {activeFilters.types.map((type) => (
              <Badge key={`type-${type}`} variant="secondary" className="gap-1">
                {type}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => toggleFilter("types", type)}
                />
              </Badge>
            ))}
            {activeFilters.results.map((result) => (
              <Badge key={`result-${result}`} variant="secondary" className="gap-1">
                {result}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => toggleFilter("results", result)}
                />
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
