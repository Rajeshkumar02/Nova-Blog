import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Container from "../container";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className=" border-t ">
      <Container>
        <div className=" grid grid-cols-1 md:grid-cols-2">
          <div className=" py-4">
            <p className=" text-lg font-semibold first-letter:text-primary">
              Nova Blog
            </p>

            <p className=" text-sm text-secondary-foreground pt-2">
              Nourish your intellect with our content
            </p>
          </div>
          <div className=" flex h-full justify-center items-center gap-3">
            <Input className="" placeholder="Email address" type="email" />
            <Button variant={"secondary"}>Subscribe</Button>
          </div>
        </div>
        <div className="mt-8 text-xs text-neutral-600">
          <p>&copy; {year} Nexus Blog</p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
