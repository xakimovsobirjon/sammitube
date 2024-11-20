import { Box, Stack } from "@mui/material"
import { ChannelCard, Loader, VideoCard } from "../"

const Videos = ({ videos }) => {
  if(!videos.length) return <Loader />

  return (
    <Stack
      width={"100%"}
      direction={"row"}
      flexWrap={"wrap"}
      justifyContent={"start"}
      alignItems={"center"}
      gap={2}
    >
      {videos.map((item,index) => (
        <Box key={index}>
          {item.id.videoId && <VideoCard video={item} />}
          {item.id.channelId && <ChannelCard video={item} />}
        </Box>
      ))}
    </Stack>
  )
}

export default Videos
