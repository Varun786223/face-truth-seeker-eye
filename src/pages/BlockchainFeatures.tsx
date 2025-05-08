
import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BlockchainWalletConnect } from "@/components/blockchain/BlockchainWalletConnect";
import { MediaHashingPanel } from "@/components/blockchain/MediaHashingPanel";
import { DecentralizedBlacklist } from "@/components/blockchain/DecentralizedBlacklist";
import { CreatorVerification } from "@/components/blockchain/CreatorVerification";
import { TruthTokenDashboard } from "@/components/blockchain/TruthTokenDashboard";
import { DAOPanel } from "@/components/blockchain/DAOPanel";
import { NFTCertification } from "@/components/blockchain/NFTCertification";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const BlockchainFeatures = () => {
  return (
    <>
      <Navbar />
      <main className="container py-20 md:py-32">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10">
            <h1 className="text-3xl font-bold sm:text-4xl">Blockchain Features</h1>
            <p className="mt-4 text-muted-foreground">
              Leverage blockchain technology to verify and secure media content
            </p>
          </div>
          
          <BlockchainWalletConnect className="mb-8" />
          
          <Tabs defaultValue="hashing" className="space-y-8">
            <TabsList className="mb-6 w-full md:w-auto">
              <TabsTrigger value="hashing">Media Hashing</TabsTrigger>
              <TabsTrigger value="blacklist">Blacklist</TabsTrigger>
              <TabsTrigger value="creators">Creator Verification</TabsTrigger>
              <TabsTrigger value="tokens">TRUTH Tokens</TabsTrigger>
              <TabsTrigger value="dao">DAO Voting</TabsTrigger>
              <TabsTrigger value="nft">NFT Certification</TabsTrigger>
            </TabsList>
            
            <TabsContent value="hashing">
              <MediaHashingPanel />
            </TabsContent>
            
            <TabsContent value="blacklist">
              <DecentralizedBlacklist />
            </TabsContent>
            
            <TabsContent value="creators">
              <CreatorVerification />
            </TabsContent>
            
            <TabsContent value="tokens">
              <TruthTokenDashboard />
            </TabsContent>
            
            <TabsContent value="dao">
              <DAOPanel />
            </TabsContent>
            
            <TabsContent value="nft">
              <NFTCertification />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default BlockchainFeatures;
