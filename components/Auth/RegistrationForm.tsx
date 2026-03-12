import FormControl from "@mui/joy/FormControl";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Link from "next/link";
import { Typography } from "@mui/joy";

const RegistrationForm = () => {
  return (
    <form>
      <FormControl>
        <Input name="login" type="text" placeholder="Imię" required />
      </FormControl>
      <FormControl sx={{ my: 2 }}>
        <Input type="email" name="login" placeholder="E-mail" required />
      </FormControl>
      <FormControl sx={{ my: 2 }}>
        <Input
          type="password"
          name="login"
          placeholder="Wpisz hasło"
          required
        />
      </FormControl>
      <FormControl sx={{ my: 2 }}>
        <Input
          type="password"
          name="login"
          placeholder="Powtórz hasło"
          required
        />
      </FormControl>
      <button className="bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 h-8 px-3 mt-3 mb-1 rounded-md font-medium cursor-pointer">
        Register
      </button>
      <Typography
        endDecorator={<Link href="/login">Sign up</Link>}
        sx={{ fontSize: "sm", alignSelf: "center" }}
      >
        Already have an account?
      </Typography>
    </form>
  );
};

export default RegistrationForm;
