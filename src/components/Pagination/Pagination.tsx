import React, { useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import { useAppDispatch, useAppSelector } from "../../store/store";
import { setPaginationData } from "../../store/reducers/blogologoReducer/actions";
import { limit } from "../../constants/constants";
import {
  getDataToStore,
  searchAndSetResults,
} from "../../store/reducers/blogologoReducer/actions";

const PaginationComponent: React.FC = () => {
  const { count, currentPage, view, articles, news, searching, newSearch } =
    useAppSelector((state) => state.blogologoReducer);
  const dispatch = useAppDispatch();

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    dispatch(setPaginationData(count, value));

    if (searching) {
      dispatch(searchAndSetResults(view, newSearch));
    } else {
      dispatch(getDataToStore(view, value));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!searching) {
        if (view === "articles" && articles.length === 0) {
          await dispatch(getDataToStore(view, currentPage));
        } else if (view === "blogs" && news.length === 0) {
          await dispatch(getDataToStore(view, currentPage));
        }
      }
    };

    fetchData();
  }, [dispatch, currentPage, articles, news, view, searching]);

  return (
    <Stack spacing={2}>
      <Pagination
        count={Math.ceil(count / limit)}
        page={currentPage}
        onChange={handlePageChange}
        sx={{
          "& .MuiPaginationItem-root": {
            borderRadius: "50%",
            color: "#313037",
            fontSize: "16px",
            backgroundColor: "transparent",
            fontWeight: "500",
            fontFamily: "Inter, sans-serif",
          },
          "& .MuiPaginationItem-page.Mui-selected": {
            color: "#6C1BDB",
          },
        }}
      />
    </Stack>
  );
};

export default PaginationComponent;
