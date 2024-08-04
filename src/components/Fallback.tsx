import { CircularProgress, Container } from "@mui/material";

export default function Fallback() {
  return (
    <Container component="main" sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
      <CircularProgress size={100} color="primary" />
    </Container>
  )
}
