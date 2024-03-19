import { IReviewer, IReviewerResponse, ISearchFilter } from './types/reviewers';
import { generateSearchParams } from './misc/utils';

export const getAllReviewers = async (): Promise<IReviewerResponse[]> => {
  const response =  await fetch('/api/reviewers', { cache: 'no-store'});
  const reviewerResp = await response.json();
  console.log('3432-----------', reviewerResp)
  return reviewerResp.reviewers ? reviewerResp.reviewers : [];
}

export const getReviewers = async (searchFilter: ISearchFilter): Promise<IReviewerResponse[]> => {
  const response =  await fetch(`/api/reviewers?filterText=?${generateSearchParams(searchFilter)}`, {
    method: 'GET',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(searchFilter)
  });
  const reviewerResp = await response.json();
  console.log('3432-----------', reviewerResp)
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