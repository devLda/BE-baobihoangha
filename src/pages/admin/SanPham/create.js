/* eslint-disable react-hooks/exhaustive-deps */

import { Card, Typography, Grid } from "@mui/material";

import { Input, Button, Select } from "../../../components/UI/form";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { object, string } from "yup";
import {
  apiAddSanPham,
  apiGetAllLSP,
  apiGetSanPham,
  apiUpdateSanPham,
} from "../../../api";
import Swal from "sweetalert2";
import path from "../../../utils/path";
import axios from "axios";
import Iconify from "../../../components/UI/iconify";

const userSchema = object({
  maSanPham: string().required("Mã sản phẩm là trường bắt buộc"),
  tenSanPham: string().required("Tên sản phẩm là trường bắt buộc"),
  maLoaiSanPham: string().required("Mã loại sản phẩm là trường bắt buộc"),
});

const Create = (props) => {
  const { type } = props;
  const { maSanPham } = useParams();
  const [value, setValue] = useState({});
  const [error, setError] = useState({});

  const [option, setOption] = useState([]);

  const [optionSel, setOptionSel] = useState([]);

  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [indexDelete, setIndexDelete] = useState("");

  const [imgPreview, setImgPreview] = useState([]);
  const [filesUpload, setFilesUpload] = useState([]);

  const startImage = useRef();

  const navigate = useNavigate();

  const getValue = () => {
    const allInput = document.querySelectorAll("input");
    const data = {};
    for (let item in allInput) {
      if (allInput[item].value) {
        if (allInput[item].type === "file") continue;
        data[`${allInput[item].name}`] = allInput[item].value;
      }
    }
    return data;
  };

  const addSanPham = async (dataAdd) => {
    const response = await apiAddSanPham(dataAdd);
    if (response.success) {
      if (filesUpload.length > 0)
        UploadImg(response.data.maSanPham, filesUpload, true);
      Swal.fire("Thành công", "Thêm mới sản phẩm thành công", "success").then(
        () => {
          navigate(`/${path.ADMIM}/${path.SANPHAM}`);
        }
      );
    } else Swal.fire("Thất bại", response.mes, "error");
  };

  const updateSanPham = async (id, dataUpdate) => {
    const response = await apiUpdateSanPham(id, dataUpdate);
    if (response.success) {
      UploadImg(dataUpdate.maSanPham, filesUpload, false);
      Swal.fire("Thành công", "Cập nhật sản phẩm thành công", "success").then(
        () => {
          navigate(`/${path.ADMIM}/${path.SANPHAM}`);
        }
      );
    } else Swal.fire("Thất bại", response.mes, "error");
  };

  const handlePost = () => {
    const data = getValue();

    (async () => {
      const validationResult = await userSchema
        .validate(data, { abortEarly: false })
        .then((res) => {
          setError({});
          if (Object.keys(res).length > 0) {
            addSanPham(res);
          }
        })
        .catch((err) => {
          return err;
        });
      let err = {};
      for (let i in validationResult?.inner) {
        if (validationResult?.inner[i].path) {
          err[validationResult?.inner[i].path] =
            validationResult?.inner[i]?.message;
        }
      }
      setError(err);
    })();
  };

  const handlePut = (e) => {
    const data = getValue();

    (async () => {
      const validationResult = await userSchema
        .validate(data, { abortEarly: false })
        .then((res) => {
          setError({});
          if (Object.keys(res).length > 0) {
            updateSanPham(maSanPham, res);
          }
        })
        .catch((err) => {
          return err;
        });
      let err = {};
      for (let i in validationResult?.inner) {
        if (validationResult?.inner[i].path) {
          err[validationResult.inner[i].path] =
            validationResult.inner[i]?.message;
        }
      }
      setError(err);
    })();
  };

  const UploadImg = async (maSanPham, fileImages, isCre) => {
    if (fileImages.length > 0)
      for (let i = 0; i < fileImages.length; i++) {
        const formData = new FormData();
        formData.append("maSanPham", maSanPham);
        formData.append("file", fileImages[i]);
        await axios
          .post(`${path.URL_API}/file/upload-file`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then()
          .catch((err) => {
            Swal.fire("Tải ảnh thất bại", err?.mes, "error");
          });
      }

    if (!isCre) {
      const imgDelete = [];
      console.log("arrayID before ", startImage.current);
      console.log("imgPre ", imgPreview);

      for (let index = 0; index < startImage.current.length; index++) {
        const element = startImage.current[index];
        if (!imgPreview.some((ele) => ele.includes(element))) {
          imgDelete.push(element.split("/")[4]);
        }
      }

      console.log("imgDefault ", imgDelete);
      for (let index = 0; index < imgDelete.length; index++) {
        const filename = imgDelete[index];
        try {
          await axios.delete(`${path.DELETE_FILE}/${filename}`); // Doesn't require server remote url as it is relative
        } catch (err) {
          Swal.fire("Xóa ảnh thất bại", err?.mes, "error");
        }
      }
    }
  };

  const ChangeImage = (e) => {
    let files = e.target.files;
    setFilesUpload(files);
    let slot = 3 - startImage.current?.length + imgPreview?.length

    if(slot > 3) {
      Swal.fire("Thông Tin", `Không thể chọn thêm ảnh`, "info");
        return
    }

    if (!files) {
      Swal.fire("Thông Tin", "Bạn chưa chọn ảnh", "info");
      return
    }
    if(files.length > slot || files?.length > 3) {
      Swal.fire("Thông Tin", `Chỉ được chọn tối đa ${slot} ảnh`, "info");
        return
    }
    else {
      if (files.length > 1) {
        let count = 0;
        for (let file = 0; file < files.length; file++) {
          if (files[file].size > 500000) {
            ++count;
            continue;
          }
          // setImgPreview([]);
          setFileToBase(files[file]);
        }

        if (count > 0) {
          Swal.fire("Thông Tin", "Ảnh có kích thước quá lớn", "info");
          return
        }
      }

      if (files.length === 1) {
        if (files[0].size < 500000) {
          // setImgPreview([]);
          setFileToBase(files[0]);
        } else {
          Swal.fire("Thông Tin", "Ảnh có kích thước quá lớn", "info");
          return
        }
      }
    }
  };

  const setFileToBase = (file) => {
    console.log("file ", file.size);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgPreview((pre) => [...pre, reader.result]);
    };
  };

  const removeImage = () => {
    console.log("indd ", indexDelete);
    const tempImgPreview = JSON.parse(JSON.stringify(imgPreview));
    tempImgPreview.splice(indexDelete, 1);
    setImgPreview(tempImgPreview);
    setOpenDialogDelete(false);
  };

  useEffect(() => {
    apiGetAllLSP()
      .then((res) => {
        const lsp = res.data?.map((item) => {
          return {
            id: item.maLoaiSanPham,
            title: item.tenLoaiSanPham,
          };
        });
        setOption(lsp);
      })
      .catch((err) => {
        console.log("err ", err);
      });

    if (type === "edit") {
      apiGetSanPham(maSanPham)
        .then((res) => {
          const sanPham = {
            maSanPham: res.data.maSanPham,
            maLoaiSanPham: res.data.maLoaiSanPham,
            tenSanPham: res.data.tenSanPham,
            hinhAnh: res.data.hinhAnh,
            moTa: res.data.moTa,
          };
          setImgPreview(JSON.parse(JSON.stringify(res.data.hinhAnh)));
          startImage.current = JSON.parse(JSON.stringify(res.data.hinhAnh));
          setValue(sanPham);
        })
        .catch((err) => {
          console.log("err ", err);
        });
    }
  }, []);

  useEffect(() => {
    console.log("zo");
    return () => {
      imgPreview &&
        imgPreview.forEach((ele) => {
          URL.revokeObjectURL(ele);
        });
    };
  }, [imgPreview]);

  useEffect(() => {
    setError((pre) => {
      return { ...pre, maLoaiSanPham: "" };
    });
  }, [optionSel]);

  return (
    <>
      <Card
        sx={{
          mb: 5,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            mx: 2,
            my: 2,
          }}
          variant="h3"
        >
          {type === "edit" ? "Cập nhật sản phẩm" : "Tạo sản phẩm mới"}
        </Typography>

        <Button
          sx={{ fontSize: "28px", m: 2 }}
          text="&rarr;"
          onClick={(e) => {
            navigate(`/${path.ADMIM}/${path.SANPHAM}`);
          }}
          className="bg-green-600"
        />
      </Card>

      <Card>
        <Grid container spacing={2} padding={2}>
          <Grid item sm={12} md={6} className="w-full">
            <Input
              error={error.maSanPham}
              name="maSanPham"
              label="Mã sản phẩm: "
              value={value.maSanPham ? value.maSanPham : ""}
              disable={type === "edit"}
            />
          </Grid>
          <Grid item sm={12} md={6} className="w-full">
            <Input
              error={error.tenSanPham}
              name="tenSanPham"
              label="Tên sản phẩm: "
              value={value.tenSanPham ? value.tenSanPham : ""}
            />
          </Grid>
          <Grid item sm={12} md={6} className="w-full">
            <Select
              error={error.maLoaiSanPham}
              label="Loại sản phẩm"
              name="maLoaiSanPham"
              options={option ? option : []}
              value={value.maLoaiSanPham ? value.maLoaiSanPham : ""}
              setChange={setOptionSel}
            />
          </Grid>
          <Grid item sm={12} md={6} className="w-full">
            <Input
              error={error.moTa}
              name="moTa"
              label="Mô tả: "
              value={value.moTa ? value.moTa : ""}
            />
          </Grid>
          <Grid item md={12} className="w-full">
            <p>Chọn file ảnh</p>
            <input
              type="file"
              name="images"
              multiple="true"
              onChange={ChangeImage}
            ></input>
            <div className="mt-5">
              {imgPreview?.length > 0 &&
                imgPreview?.map((item, ind) => (
                  <div
                    key={ind}
                    className="group/imgParent relative inline-block cursor-pointer"
                    onClick={(e) => {
                      let fileName = item.split("/")[4];
                      console.log("filename ", fileName);
                      setIndexDelete(ind);
                      setOpenDialogDelete(true);
                    }}
                  >
                    <Iconify
                      className={
                        "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-600 invisible group-hover/imgParent:visible"
                      }
                      icon={"eva:trash-2-outline"}
                      sx={{
                        position: "absolute",
                        width: 40,
                        height: 40,
                      }}
                    />
                    <img
                      className={`w-40 h-40 inline-block group-hover/imgParent:opacity-10 ${
                        ind === 0 ? "" : "mx-5"
                      }`}
                      src={item}
                      alt="Preview"
                    />
                  </div>
                ))}
            </div>
          </Grid>

          {openDialogDelete && (
            <Dialog
              open={openDialogDelete}
              onClose={(e) => {
                setOpenDialogDelete(false);
              }}
              aria-labelledby="alert-dialog-image"
              aria-describedby="alert-dialog-description-image"
            >
              <DialogTitle id="alert-dialog-image">Xóa ảnh</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description-image">
                  {`Bạn có muốn xóa ảnh không?`}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <button
                  className="w-20 h-8 rounded-2xl bg-blue-600 text-white"
                  onClick={(e) => {
                    setOpenDialogDelete(false);
                  }}
                >
                  Không
                </button>
                <button
                  className="w-20 h-8 rounded-2xl bg-red-600 text-white"
                  onClick={(e) => {
                    removeImage();
                  }}
                  autoFocus
                >
                  Có
                </button>
              </DialogActions>
            </Dialog>
          )}
        </Grid>
        <Button
          sx={{
            my: 2,
            mx: 2,
          }}
          text={type === "edit" ? "Cập nhật" : "Thêm"}
          onClick={(e) => {
            if (type === "edit") {
              handlePut(e);
            } else {
              handlePost(e);
            }
          }}
          className="bg-green-600"
        />
      </Card>
    </>
  );
};

export default Create;
