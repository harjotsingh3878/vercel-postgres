import AddReviewerButton from './AddReviewerButton'
import FilterReviewers from './FilterReviewers'
import ReviewerList from './ReviewerList'

const ManageReviewers = () => {
  return (
    <>
      <div className="text-center my-5 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Manage Reviewers</h1>
        <AddReviewerButton />
        <FilterReviewers />
      </div>
      <ReviewerList />
    </>
  )
}

export default ManageReviewers