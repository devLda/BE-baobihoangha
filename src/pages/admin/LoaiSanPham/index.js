/* eslint-disable react-hooks/exhaustive-deps */

import { filter } from "lodash";
// import { sentenceCase } from 'change-case';
import { useEffect, useState } from "react";
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  // Avatar,
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
import { useSelector } from "react-redux";
// import { LoadingData } from "../../../components/UI/loading";
import path from "../../../utils/path";
import Swal from "sweetalert2";
import { apiDeleteLSP, apiGetAllLSP } from "../../../api";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "maLoaiPhong", label: "Mã loại sản phẩm", alignRight: false },
  { id: "tenLoaiSanPham", label: "Tên loại sản phẩm", alignRight: false },
  { id: "" },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return 1;
  }
  if (b[orderBy] > a[orderBy]) {
    return -1;
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
      (LP) =>
        LP.tenLoaiSanPham.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis?.map((el) => el[0]);
}

const LoaiSanPham = () => {
  const { statusLSP, loaiSanPham } = useSelector((state) => state.loaiSanPham);

  const [isLoading, setIsLoading] = useState(true);

  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("tenLoaiSanPham");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [listLSP, setListLSP] = useState([]);

  const [LPSelected, setLSPSelected] = useState("");

  const [openDialog, setOpenDialog] = useState(false);

  const [deleted, setDeleted] = useState(false);

  const handleOpenMenu = (event, maLoaiSanPham) => {
    setLSPSelected(maLoaiSanPham);
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setLSPSelected("");
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      // const newSelecteds = USERLIST?.map((n) => n.name);
      const newSelecteds = listLSP?.map((n) => n.tenLoaiSanPham);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  // const handleClick = (event, name) => {
  //   const selectedIndex = selected.indexOf(name);
  //   let newSelected = [];
  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, name);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1)
  //     );
  //   }
  //   setSelected(newSelected);
  // };

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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - listLSP.length) : 0;

  const filteredLSP = applySortFilter(
    // USERLIST,
    listLSP,
    getComparator(order, orderBy),
    filterName
  );

  const isNotFound = !filteredLSP.length && !!filterName;

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
      const response = await apiDeleteLSP(selectedAcc);
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
    console.log("zo");
    apiGetAllLSP()
      .then((res) => {
        console.log("reslsp ", res);
        if (res) {
          setListLSP(res.data);
        }
      })
      .catch((err) => {
        console.log("err ", err);
      });
  }, [deleted]);

  useEffect(() => {
    if (statusLSP === "fulfilled" && loaiSanPham) {
      setListLSP(loaiSanPham);
      setIsLoading(false);
    }
  }, [statusLSP]);

  // useEffect(async () => {

  // dispatch(getAllLSP())
  // .then((res) => {
  //   console.log("res ", res);
  //   if (res.meta.requestStatus === "fulfilled") {
  //     setListLSP(res.payload);
  //   }
  // })
  // .catch((err) => {
  //   console.log("err ", err);
  // });
  // }, [deleted]);

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
            Loại Sản Phẩm
          </Typography>
          <Link to={`/${path.ADMIM}/${path.LOAISANPHAM}/${path.CREATE}`}>
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              className="bg-green-600"
            >
              Thêm Loại Sản Phẩm
            </Button>
          </Link>
        </Stack>

        {!isLoading && (
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
                    rowCount={listLSP.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                    hasChk={false}
                  />
                  <TableBody>
                    {filteredLSP
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      ?.map((row) => {
                        const { maLoaiSanPham, tenLoaiSanPham } = row;
                        const selectedLSP =
                          selected.indexOf(tenLoaiSanPham) !== -1;

                        return (
                          <TableRow
                            hover
                            key={maLoaiSanPham}
                            tabIndex={-1}
                            role="checkbox"
                            selected={selectedLSP}
                          >
                            {/* <TableCell padding="checkbox">
                              <Checkbox
                                checked={selectedLSP}
                                onChange={(event) =>
                                  handleClick(event, tenLoaiSanPham)
                                }
                              />
                            </TableCell> */}

                            <TableCell align="left">{maLoaiSanPham}</TableCell>
                            <TableCell align="left">{tenLoaiSanPham}</TableCell>

                            <TableCell align="right">
                              <IconButton
                                size="large"
                                color="inherit"
                                onClick={(e) =>
                                  handleOpenMenu(e, maLoaiSanPham)
                                }
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
                              <br /> .Thử kiểm tra tên loại sản phẩm bạn nhập
                              vào
                            </Typography>
                          </Paper>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Scrollbar>

            {filteredLSP.length > 5 && (
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredLSP.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            )}
          </Card>
        )}
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
          to={`/${path.ADMIM}/${path.LOAISANPHAM}/${path.UPDATE}/${LPSelected}`}
          className="no-underline"
        >
          <MenuItem>
            <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
            Sửa
          </MenuItem>
        </Link>

        <MenuItem
          sx={{ color: "error.main" }}
          data-set={LPSelected}
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
          <DialogTitle id="alert-dialog-title">Xóa loại Sản Phẩm</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {`Bạn có muốn xóa loại sản phẩm có mã ${LPSelected} không?`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Không</Button>
            <Button onClick={(e) => handleDelete(e, LPSelected)} autoFocus>
              Có
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default LoaiSanPham;
