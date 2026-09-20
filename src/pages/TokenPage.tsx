import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Stack,
  Typography,
  Avatar,
  Button,
  Divider,
} from "@mui/material";
import { useAuth } from "../firebase/AuthContext";

export default function TokenPage() {
  const { user, accessToken, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F5F7F5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Paper sx={{ maxWidth: 560, width: "100%", p: 4, borderRadius: 4 }} elevation={0}>
        <Stack spacing={3}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar
              src={user?.photoURL ?? undefined}
              alt={user?.displayName ?? "User"}
              sx={{ width: 56, height: 56 }}
            />
            <Box>
              <Typography variant="h6" fontWeight={700}>
                {user?.displayName ?? "Signed in"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user?.email}
              </Typography>
            </Box>
          </Stack>

          <Divider />

          <Box>
            <Typography variant="subtitle2" fontWeight={700} gutterBottom>
              Google OAuth Access Token
            </Typography>
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                bgcolor: "#111111",
                color: "#7CC49A",
                fontFamily: "monospace",
                fontSize: 12,
                wordBreak: "break-all",
                borderRadius: 2,
              }}
            >
              {accessToken ?? "No access token available"}
            </Paper>
          </Box>

          <Button
            variant="contained"
            onClick={handleLogout}
            sx={{ bgcolor: "#111111", "&:hover": { bgcolor: "#000" } }}
          >
            Log out
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
