import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { ApiService } from "../../service/api.service"
import { Avatar, Box, Chip, Stack, Typography } from "@mui/material"
import ReactPlayer from "react-player"
import {
  CheckCircle,
  FavoriteOutlined,
  MarkChatRead,
  Tag,
  Visibility
} from "@mui/icons-material"
import Linkify from "react-linkify"
import { Loader, Videos } from "../"

const VideoDetail = () => {
  const [VideoDetail, setVideoDetail] = useState(null)
  const [relatedVideo, setRelatedVideo] = useState([])
  const { id } = useParams()

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await ApiService.fetching(
          `videos?part=snippet,statistics&id=${id}`
        )
        setVideoDetail(data.items[0])
        const relatedData = await ApiService.fetching(
          `search?part=snippet,statistics&relatedToVideoId=${id}&type=video`
        )
        setRelatedVideo(relatedData.items)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [id])

  if (!VideoDetail) return <Loader />

  return (
    <Box minHeight={"90vh"} mb={10}>
      <Box display={"flex"} sx={{ flexDirection: { xs: "column", md: "row" } }}>
        <Box width={{ xs: "100%", md: "75%" }}>
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${id}`}
            className="react-player"
            controls
          />
          {VideoDetail?.snippet?.tags?.map((item, index) => (
            <Chip
              label={item}
              key={index}
              sx={{ marginTop: "10px", cursor: "pointer", ml: "10px" }}
              deleteIcon={<Tag />}
              onDelete={() => {}}
              variant="outlined"
            />
          ))}
          <Typography variant="h5" fontWeight={"bold"} p={2}>
            {VideoDetail?.snippet?.title}
          </Typography>
          <Typography variant="subtitle2" p={2} sx={{ opacity: "0.7" }}>
            <Linkify
              componentDecorator={(decoratedHref, decoratedText, key) => (
                <a
                  href={decoratedHref}
                  key={key}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "blue", textDecoration: "underline" }}
                >
                  {decoratedText}
                </a>
              )}
            >
              <pre style={{ whiteSpace: "pre-wrap" }}>
                {VideoDetail?.snippet?.description}
              </pre>
            </Linkify>
          </Typography>
          <Stack
            direction={"row"}
            gap={"20px"}
            alignItems={"center"}
            py={1}
            px={2}
          >
            <Stack
              sx={{ opacity: "0.7" }}
              direction={"row"}
              gap={"3px"}
              alignItems={"center"}
            >
              <Visibility />
              {parseInt(
                VideoDetail?.statistics?.viewCount
              ).toLocaleString()}{" "}
              views
            </Stack>
            <Stack
              sx={{ opacity: "0.7" }}
              direction={"row"}
              gap={"3px"}
              alignItems={"center"}
            >
              <FavoriteOutlined />
              {parseInt(
                VideoDetail?.statistics?.likeCount
              ).toLocaleString()}{" "}
              likes
            </Stack>
            <Stack
              sx={{ opacity: "0.7" }}
              direction={"row"}
              gap={"3px"}
              alignItems={"center"}
            >
              <MarkChatRead />
              {parseInt(
                VideoDetail?.statistics?.commentCount
              ).toLocaleString()}{" "}
              comments
            </Stack>
          </Stack>
          <Link to={`/channel/${VideoDetail?.snippet?.channelId}`}>
            <Stack direction={"row"} py={1} px={2}>
              <Stack
                direction={"row"}
                alignItems={"center"}
                gap={"5px"}
                marginTop={"5px"}
              >
                <Avatar
                  src={VideoDetail?.snippet?.thumbnails?.default?.url}
                  alt={VideoDetail?.snippet?.channelTitle}
                />
                <Typography variant="subtitle2" color={"gray"}>
                  {VideoDetail?.snippet?.channelTitle}
                  <CheckCircle
                    sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
                  />
                </Typography>
              </Stack>
            </Stack>
          </Link>
        </Box>
        <Box
          width={{ xs: "100%", md: "25%" }}
          px={2}
          py={{ md: 1, xs: 5 }}
          justifyContent={"center"}
          alignItems={"center"}
          overflow={"scroll"}
          maxHeight={"120vh"}
        >
          <Videos videos={relatedVideo} />
        </Box>
      </Box>
    </Box>
  )
}

export default VideoDetail
