import AddReviewerButton from "./components/AddReviewerButton";
import { getAllReviewers } from "@/api";
import ReviewerList from "./components/ReviewerList";

export default async function Home() {
  const reviewers = await getAllReviewers()

  return (
    <main className="min-h-screen max-w-4xl mx-auto p-24">
      <div className="text-center my-5 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Manage Reviewers</h1>
        <AddReviewerButton />
      </div>
      <ReviewerList reviewers={reviewers}/>
    </main>
  );
}