/* eslint-disable no-unused-vars */

import { filter } from "lodash";
import { useEffect, useState } from "react";
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Button,
  Popover,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from "@mui/material";

// components
// import Label from '../components/label';
import Iconify from "../../../components/UI/iconify";
import Scrollbar from "../../../components/UI/scrollbar";
// sections
import { ListHead, ListToolbar } from "../../../components/UI/table";

import { Link } from "react-router-dom";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// import { LoadingData } from "../../../components/UI/loading";
import path from "../../../utils/path";
import Swal from "sweetalert2";
import { apiDeleteSanPham, apiGetAllSanPham } from "../../../api";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "maSanPham", label: "Mã sản phẩm", alignRight: false },
  { id: "tenSanPham", label: "Tên sản phẩm", alignRight: false },
  { id: "tenLoaiSanPham", label: "Tên loại", alignRight: false },
  { id: "hinhAnh", label: "Hình ảnh", alignRight: false },
  { id: "" },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (orderBy === "tenSanPham" || orderBy === "maSanPham" || orderBy === "tenLoaiSanPham") {
    if (b[orderBy] < a[orderBy]) {
      return 1;
    }
    if (b[orderBy] > a[orderBy]) {
      return -1;
    }
    return 0;
  }

  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (SP) => SP.tenSanPham.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis?.map((el) => el[0]);
}

const SanPham = () => {
  // const { isLoading } = useSelector((state) => state.phong);

  // const dispatch = useDispatch();

  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("tenSanPham");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [listSanPham, setListSanPham] = useState([]);

  const [sanPhamSelected, setSanPhamSelected] = useState("");

  const [openDialog, setOpenDialog] = useState(false);

  const [deleted, setDeleted] = useState(false);

  const handleOpenMenu = (event, maSanPham) => {
    setSanPhamSelected(maSanPham);
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setSanPhamSelected("");
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows =
    // page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - listSanPham.length) : 0;

  const filteredSanPham = applySortFilter(
    // USERLIST,
    listSanPham,
    getComparator(order, orderBy),
    filterName
  );

  const isNotFound = !filteredSanPham.length && !!filterName;

  const handleAction = (e) => {
    if (e.target.dataset.set) {
      if (e.target.innerText === "Xoá") setOpenDialog(true);
    }
  };

  const handleClose = () => {
    setOpenDialog(false);
    setOpen(false);
  };

  const handleDelete = async (event, selectedAcc) => {
    if (event) {
      const response = await apiDeleteSanPham(selectedAcc);
      if (response.success) {
        setOpenDialog(false);
        setDeleted(true);
        setOpen(false);
        Swal.fire("Thành công", response.mes, "success");
      } else {
        setOpenDialog(false);
        setDeleted(false);
        setOpen(false);
        Swal.fire("Thất bại", response.mes, "error");
      }
    }
  };

  useEffect(() => {
    apiGetAllSanPham()
      .then((res) => {
        if (res) {
          setListSanPham(res.data);
        }
      })
      .catch((err) => {
        console.log("err ", err);
      });

    // dispatch(getAllSanPham())
    //   .then((res) => {
    //     if (res.meta.requestStatus === "fulfilled") {
    //       setListSanPham(res.payload);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log("err ", err);
    //   });
  }, [deleted]);

  // if (isLoading) {
  //   return <LoadingData />;
  // }

  return (
    <>
      <Container>
        <Stack
          direction="column"
          alignItems="start"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Sản phẩm
          </Typography>
          <Link to={`/${path.ADMIM}/${path.SANPHAM}/${path.CREATE}`}>
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              className="bg-green-600"
            >
              Thêm sản phẩm
            </Button>
          </Link>
        </Stack>

        <Card>
          <ListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            setValue={false}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <ListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  // rowCount={USERLIST.length}
                  rowCount={listSanPham.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  // onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredSanPham
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    ?.map((row) => {
                      const {
                        _id,
                        maSanPham,
                        tenSanPham,
                        tenLoaiSanPham,
                        hinhAnh,
                      } = row;
                      const selectedUser = selected.indexOf(_id) !== -1;

                      return (
                        <TableRow
                          hover
                          key={_id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={selectedUser}
                        >
                          {/* <TableCell padding="checkbox">
                            <Checkbox
                              checked={selectedUser}
                              onChange={(event) => handleClick(event, _id)}
                            />
                          </TableCell> */}

                          <TableCell align="left">{maSanPham}</TableCell>
                          <TableCell align="left">{tenSanPham}</TableCell>
                          <TableCell align="left">
                            {tenLoaiSanPham}
                          </TableCell>

                          <TableCell align="left">
                            {hinhAnh?.length > 0 && (
                              <img
                                src={hinhAnh[0]}
                                className="w-20 h-20"
                                alt={tenSanPham}
                              />
                            )}
                          </TableCell>

                          <TableCell align="right">
                            <IconButton
                              size="large"
                              color="inherit"
                              onClick={(e) => handleOpenMenu(e, maSanPham)}
                            >
                              <Iconify icon={"eva:more-vertical-fill"} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Không tìm thấy
                          </Typography>

                          <Typography variant="body2">
                            Không có kết quả cho &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Kiểm tra từ khoá bạn nhập vào
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          {filteredSanPham.length > 5 && (
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredSanPham.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            "& .MuiMenuItem-root": {
              px: 1,
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Link
          to={`/${path.ADMIM}/${path.SANPHAM}/${path.UPDATE}/${sanPhamSelected}`}
          className="no-underline"
        >
          <MenuItem>
            <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
            Sửa
          </MenuItem>
        </Link>

        <MenuItem
          sx={{ color: "error.main" }}
          data-set={sanPhamSelected}
          onClick={handleAction}
        >
          <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
          Xoá
        </MenuItem>
      </Popover>

      {openDialog && (
        <Dialog
          open={openDialog}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Xóa loại sản phẩm</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {`Bạn có muốn xóa sản phẩm có mã ${sanPhamSelected} không?`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Không</Button>
            <Button onClick={(e) => handleDelete(e, sanPhamSelected)} autoFocus>
              Có
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default SanPham;
