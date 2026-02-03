import { Button } from "@mui/joy";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import { Typography } from "@mui/joy";
import Link from "next/link";

const LoginForm = () => {
  return (
    <form>
      <FormControl sx={{ my: 2 }}>
        <FormLabel>Login:</FormLabel>
        <Input type="text" name="login" placeholder="" required></Input>
      </FormControl>
      <FormControl sx={{ my: 2 }}>
        <FormLabel>Hasło:</FormLabel>
        <Input type="password" name="login" placeholder="" required></Input>
      </FormControl>
      <Button sx={{ mt: 3, mb: 1 }}>Login</Button>
      <Typography
        endDecorator={<span>Register</span>}
        sx={{ fontSize: "sm", alignSelf: "center" }}
      >
        Don&apos;t have an account?
      </Typography>
    </form>
  );
};

export default LoginForm;
