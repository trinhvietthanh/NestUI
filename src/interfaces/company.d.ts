export type Pagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type CompanyItem = {
  name: string;
  icon: string;
  symbol: string;
  ipo?: number;
  totalAssets: number;
  revenue: number;
};

export type CompaniesListData = {
  list: CompanyItem[];
  pagination: Partial<Pagination>;
};

export type CompaniesListParams = {
  name?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
};
