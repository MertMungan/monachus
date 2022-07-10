import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import { useSkin } from "@hooks/useSkin";

export default function BasicBrowserCard({ element = {} }) {
  const [skin, setSkin] = useSkin();

  const renderItemDetails = () => {
    {
      return Object.entries(element).map(([key, value]) => {
        return (
          <div>
            {" "}
            {key} : {value}{" "}
          </div>
        );
      });
    }
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent
        style={{
          backgroundColor: skin === "dark" ? "#283046" : "#fff",
          color: skin === "dark" ? "#d0d2d6" : "black",
        }}
      >
        {renderItemDetails()}
      </CardContent>
      <Divider style={{ marginTop: "0px", marginBottom: "0px" }} />
      <CardActions
        style={{
          backgroundColor: skin === "dark" ? "#283046" : "#fff",
          color: skin === "dark" ? "#d0d2d6" : "black",
        }}
      >
        Delete
      </CardActions>
    </Card>
  );
}
