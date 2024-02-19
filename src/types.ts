export interface Investor {
  name: string;
  industry: string;
  startups: Startup[];
  deletedStartups: Startup[];
  originalName: string;
}

export interface Startup {
  name: string;
  industry: string;
}

export interface RawInvestor {
  name: string;
  industry: string;
}
