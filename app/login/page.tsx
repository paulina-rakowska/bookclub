import LoginForm from "@/components/Auth/LoginForm";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

export default async function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <LoginForm />
      </main>
      <Footer />
    </div>
  );
}
