import { Switch, Route } from "wouter";
import NotFound from "@/pages/not-found";
import Home from "@/pages/simple-home";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Router />
      <Footer />
    </div>
  );
}

export default App;
