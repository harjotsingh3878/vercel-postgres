import { IReviewer } from './types/reviewers';

export const getAllReviewers = async (): Promise<IReviewer[]> => {
  const response =  await fetch('/api/reviewers');
  const reviewerResp = await response.json();
  return reviewerResp.reviewers.rows;
}

export const addReviewer = async (reviewer: IReviewer): Promise<IReviewer> => {
  const response =  await fetch('/api/add-reviewer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(reviewer)
  });
  const newReviewer = await response.json();
  return newReviewer;
}