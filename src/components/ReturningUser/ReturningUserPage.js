import React, { useEffect, useState } from "react";
import { Typography, Container, MenuItem } from "@mui/material";
import { Grid } from "@mui/material";
import { versionCode } from "../../constant";
import LearningTrackCard from "./LearningTrackCard";
import axios from "axios";
import { METHODS } from "../../services/api";
import { useSelector } from "react-redux";
import Select from "@material-ui/core/Select";

function ReturningUserPage() {
  // category state and options:-
  const [category, setCategory] = useState("All");
  const categoryOptions = [
    { category: "All", label: "All" },
    { category: "Non-Tech", label: "Non-Tech" },
    { category: "Tech", label: "Tech" },
  ];

  const user = useSelector(({ User }) => User);
  const [learningTracks, setLearningTracks] = useState([]);
  
  useEffect(() => {
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/pathways/ongoingTopic`,
      headers: {
        "version-code": versionCode,
        accept: "application/json",
        Authorization: user?.data?.token || "",
      },
    }).then((res) => {
      const data = res.data;
      setLearningTracks(data);
    });
  }, []);
  console.log(learningTracks, "learning");

  let learningTracksGridContainer;
  // if category is All below will be added to variable learningTrackGridContainer
  if (category == "All") {
    learningTracksGridContainer = (
      <Grid container spacing={1} mt={5}>
        {learningTracks.map((item) => (
          <LearningTrackCard item={item} />
        ))}
      </Grid>
    );
  } 
  // if category is Non-Tech below will be added to variable learningTrackGridContainer
  else if (category == "Non-Tech") {
    learningTracksGridContainer = (
      <Grid container spacing={1} mt={5}>
        {learningTracks.map((item) =>
          item.pathway_id == 6 ||
          item.pathway_id == 3 ||
          item.pathway_id == 2 ||
          item.pathway_id == 5 ? (
            <LearningTrackCard item={item} />
          ) : (
            ""
          )
        )}
      </Grid>
    );
  } 
  // if category is Tech below will be added to variable learningTrackGridContainer
  else if (category == "Tech") {
    learningTracksGridContainer = (
      <Grid container spacing={1} mt={5}>
        {learningTracks.map((item) =>
          item.pathway_id == 1 || item.pathway_id == 4 ? (
            <LearningTrackCard item={item} />
          ) : (
            ""
          )
        )}
      </Grid>
    );
  }

  return (
    <>
      <Container maxWidth="lg">
        <Typography variant="h6" mb={5} mt={5}>
          My Learning Tracks
        </Typography>
        {/* dropdown for category */}
        <Select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          {categoryOptions.map((option, index) => (
            <MenuItem key={index} value={option.category}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        {/* --------Grid with filtered courses-------- */}
        {learningTracksGridContainer}
      </Container>
    </>
  );
}
export default ReturningUserPage;
