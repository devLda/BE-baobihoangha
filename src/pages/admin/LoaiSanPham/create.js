/* eslint-disable react-hooks/exhaustive-deps */

import { Card, Typography } from "@mui/material";

import { Grid } from "@mui/material";
import { Input, Button } from "../../../components/UI/form";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { object, string } from "yup";
import { apiAddLSP, apiGetLSP, apiUpdateLSP } from "../../../api";
import Swal from "sweetalert2";
import path from "../../../utils/path";

const userSchema = object({
  maLoaiSanPham: string().required("Mã loại sản phẩm là trường bắt buộc"),
  tenLoaiSanPham: string().required("Tên loại sản phẩm là trường bắt buộc"),
});

const Create = (props) => {
  const { type } = props;
  const { maLoaiSanPham } = useParams();
  const [value, setValue] = useState({});
  const [error, setError] = useState({});

  // const [imgPreview, setImgPreview] = useState([]);

  const navigate = useNavigate();

  const defaultValue = useRef();

  const getValue = () => {
    const allInput = document.querySelectorAll("input");
    const data = {};
    for (let item in allInput) {
      if (allInput[item].value) {
        let date = "";
        if (allInput[item].type === "file") continue;
        if (allInput[item].value.includes("/")) {
          let dayData = allInput[item].value.split("/");
          date = dayData[2] + "-" + dayData[1] + "-" + dayData[0];
          data["NgaySinh"] = date;
          continue;
        }
        data[`${allInput[item].name}`] = allInput[item].value;
      }
    }
    return data;
  };

  const addLoaiSanPham = async (dataAdd) => {
    const response = await apiAddLSP(dataAdd);
    if (response.success) {
      Swal.fire("Thành công", "Thêm mới loại phòng thành công", "success").then(
        () => {
          navigate(`/${path.ADMIM}/${path.LOAISANPHAM}`);
        }
      );
    } else Swal.fire("Thất bại", response.mes, "error");
  };

  const updateLoaiSanPham = async (dataUpdate) => {
    const response = await apiUpdateLSP(dataUpdate.maLoaiSanPham, dataUpdate);
    if (response.success) {
      Swal.fire("Thành công", "Cập nhật loại phòng thành công", "success");
    } else Swal.fire("Thất bại", response.mes, "error");
  };

  const handlePost = () => {
    const data = getValue();
    //   // data.image = imgPreview;
    (async () => {
      const validationResult = await userSchema
        .validate(data, { abortEarly: false })
        .then((res) => {
          setError({});
          if (Object.keys(data).length > 0) {
            addLoaiSanPham(data);
          }
        })
        .catch((err) => {
          return err;
        });
      let err = {};
      if (validationResult?.inner)
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
          if (Object.keys(data).length > 0) {
            updateLoaiSanPham(data);
          }
        })
        .catch((err) => {
          return err;
        });
      let err = {};
      if (validationResult?.inner)
        for (let i in validationResult.inner) {
          if (validationResult.inner[i].path) {
            err[validationResult.inner[i].path] =
              validationResult.inner[i]?.message;
          }
        }
      setError(err);
    })();
  };

  useEffect(() => {
    if (type === "edit") {
      apiGetLSP(maLoaiSanPham)
        .then((res) => {
          const { createdAt, updatedAt, __v, ...valueRef } = res.data;
          defaultValue.current = valueRef;
          setValue(res.data);
        })
        .catch((err) => {
          console.log("err ", err);
        });
    }
  }, []);

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
          {type === "edit" ? "Cập nhật loại sản phẩm" : "Tạo loại sản phẩm mới"}
        </Typography>

        <Button
          sx={{ fontSize: "28px", m: 2 }}
          text="&rarr;"
          onClick={(e) => {
            navigate(`/${path.ADMIM}/${path.LOAISANPHAM}`);
          }}
          className="bg-green-600"
        />
      </Card>

      <Card>
        <Grid container spacing={2} padding={2}>
          <Grid item sm={12} md={6} className="w-full">
            <Input
              error={error.maLoaiSanPham}
              disable={value.maLoaiSanPham ? true : false}
              name="maLoaiSanPham"
              label="Mã loại sản phẩm: "
              value={value.maLoaiSanPham ? value.maLoaiSanPham : ""}
            />
          </Grid>
          <Grid item sm={12} md={6} className="w-full">
            <Input
              error={error.tenLoaiSanPham}
              name="tenLoaiSanPham"
              label="Tên loại sản phẩm: "
              value={value.tenLoaiSanPham ? value.tenLoaiSanPham : ""}
            />
          </Grid>
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
