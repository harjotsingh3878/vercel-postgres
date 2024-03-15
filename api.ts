import { QueryResultRow, sql } from '@vercel/postgres';
import { IReviewer } from './app/types/reviewers';

const baseUrl = 'http://localhost:3000/api';

export const getAllReviewers = async (): Promise<IReviewer[]> => {
  const response =  await fetch(`${baseUrl}/reviewers`);
  const reviewerResp = await response.json();
  return reviewerResp.reviewers.rows;
}

export const addReviewer = async (reviewer: IReviewer): Promise<IReviewer> => {
  const response =  await fetch(`${baseUrl}/add-reviewer`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(reviewer)
  });
  const newReviewer = await response.json();
  return newReviewer;
}