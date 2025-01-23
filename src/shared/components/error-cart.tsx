import { routes } from "@/routes";
import { Card, CardFooter, CardHeader } from "../ui/card";
import { BackButton } from "./back-button";
import { Header } from "./header";

export const ErrorCard = () => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label="Error" />
      </CardHeader>
      <CardFooter>
        <BackButton label="Back" href={routes.signIn()} />
      </CardFooter>
    </Card>
  );
};
