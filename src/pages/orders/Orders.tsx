import {
  Box,
  Chip,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import React, { useEffect } from "react";
import { FONT_FAMILIES, ORDER_STATUS } from "../../utils/constants";
import useAxios from "../../hooks/useAxios";
import { FaEdit } from "react-icons/fa";
import moment from "moment";

function formatDate(inputDate: Date) {
  if (!moment(inputDate, moment.ISO_8601, true).isValid()) {
    return "Invalid date";
  } else {
    return moment(inputDate).format("DD MMM, YYYY");
  }
}
TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
function TablePaginationActions(props: any) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event: any) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: any) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: any) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: any) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

const StyleOrderStatus = (status: string) => {
  if (status === ORDER_STATUS.DELIVERED) {
  }
  if (status === ORDER_STATUS.SHIPPED) {
  }
  if (status === ORDER_STATUS.PENDING) {
    return (
      <Typography
        sx={{
          background: "tomato",
          color: "#fff",
          textTransform: "uppercase",
          textAlign: "center",
          borderRadius: "25px",
          fontSize: "14px",
          padding: "2px 10px",
        }}
      >
        {status}
      </Typography>
    );
  }
};

const Orders = () => {
  const { fetchData, data, isError, isLoading } = useAxios();
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);

  useEffect(() => {
    fetchData({
      method: "GET",
      url: "/orders",
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem("token")}`,
      //     "api-key": process.env.REACT_APP_API_KEY,
      //   },
    })
      .then((apiResponse) => {
        console.log(apiResponse);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);

  const TABLE_HEADER_CELLS = [
    "ID",
    "Customer",
    "Amount",
    "Status",
    "Order Date",
    "Items",
    "Action",
  ];
  if (isLoading) {
    return "Orders loading...";
  }

  if (isError) {
    return "Failed to load orders.";
  }

  return (
    <Box>
      <Typography sx={{ fontFamily: FONT_FAMILIES.BEBAS_NEUE, fontSize: 50 }}>
        ORDERS
      </Typography>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {TABLE_HEADER_CELLS.map((cell) => (
                <TableCell key={cell}>{cell}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((order: any, index: number) => (
              <TableRow key={index}>
                <TableCell>{order._id}</TableCell>
                <TableCell>{order.customer.username}</TableCell>
                <TableCell>{order.totalAmount}</TableCell>
                <TableCell>{StyleOrderStatus(order.status)}</TableCell>
                <TableCell>{formatDate(order.orderDate)}</TableCell>
                <TableCell sx={{ width: "300px" }}>
                  <Stack direction="row" flexWrap="wrap" gap={1}>
                    {order.items.map((item: any, index: number) => (
                      <img
                        src={item.product.imageURL}
                        key={index}
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                          borderRadius: "50%",
                        }}
                      />
                    ))}
                  </Stack>
                </TableCell>
                <TableCell>
                  <FaEdit
                    style={{ fontSize: 30, color: "tomato", cursor: "pointer" }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                slotProps={{
                  select: {
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  },
                }}
                onPageChange={(event, newPage) => {
                  setPage(newPage);
                }}
                onRowsPerPageChange={(event) => {
                  setRowsPerPage(parseInt(event.target.value, 10));
                  setPage(0);
                }}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Orders;
