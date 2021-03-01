import { gql } from "@apollo/client";
export const FIND_SERVICE_LIST = gql`
query findServiceList($page: PageInput, $sort: SortInput, $filters: [FilterInput], $disjunctionFilters: Boolean){
    findServiceList(page: $page, sort: $sort, filters: $filters, disjunctionFilters: $disjunctionFilters) {
      totalPages
      totalElements
      numberOfElements
      size
      number
      content {
        id
        name
        code
      }
    }
  }
`;
