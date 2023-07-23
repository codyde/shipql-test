"use client";
import Image from "next/image";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import gql from "graphql-tag";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

const query = gql`
  query {
    starships {
      name
      model
      manufacturer
      hyperdrive_rating
    }
  }
`;

export default function Home() {
  const { data }: any = useSuspenseQuery(query);

  return (
    <main className="flex min-h-screen mx-4 xl:mx-32 flex-col items-center justify-between py-5">
      <div className="grid text-center">
        <p className="text-5xl xl:text-8xl font-bold text-red-800 pb-2">Star Wars ShipQL</p>
        <p className="text-md xl:text-xl text-muted-foreground pb-8">My state of messing around with Apollo GraphQL and NextJS 13.4 + AppRouter</p>
        </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-3">
        {data.starships.map((starship: any) => (
          <Card className="gap-3" key={starship.name}>
            <CardHeader className="text-2xl font-bold">
              {starship.name}
            </CardHeader>
            <CardContent className="grid">
              <p><span className="text-orange-500 font-bold">Model:</span> {starship.manufacturer}</p>
              <p><span className="text-orange-500 font-bold">Hyperdrive Rating:</span> {starship.hyperdrive_rating}</p>
              </CardContent>
            
          </Card>
        ))}
      </div>
    </main>
  );
}
