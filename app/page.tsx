import AddReviewerButton from "./components/AddReviewerButton";
import { getAllReviewers } from "@/app/api";
import ReviewerList from "./components/ReviewerList";
import ManageReviewers from "./components/ManageReviewers";

export default async function Home() {
  return (
    <main className="min-h-screen max-w-4xl mx-auto p-24">
      <ManageReviewers />
    </main>
  );
}
