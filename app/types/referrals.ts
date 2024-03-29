export interface IReferralResponse {
  fullname: string;
  company: string;
  job_title: string;
  job_field: string;
  street_address: string;
  province: string;
  city: string;
  mobile: string;
  email: string;
  id: number;
}

export interface IReferral {
  id?: number;
  fullname: string;
  company: string;
  jobTitle: string;
  jobField: string;
  streetAddress: string;
  province: string;
  city: string;
  mobile: string;
  email: string;
}

export interface ISearchFilter {
  searchText: string;
  searchType: string;
  jobField: string;
  location: string;
}