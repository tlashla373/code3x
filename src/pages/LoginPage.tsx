import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Stack,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Link,
  Divider,
  Alert,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import FacebookIcon from "@mui/icons-material/Facebook";
import IllustrationPanel from "../components/IllustrationPanel";
import { useAuth } from "../firebase/AuthContext";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FormErrors {
  username?: string;
  password?: string;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const { signInWithGoogle } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [googleError, setGoogleError] = useState<string | null>(null);
  const [googleLoading, setGoogleLoading] = useState(false);

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};

    if (!username.trim()) {
      nextErrors.username = "Username or email is required";
    } else if (username.includes("@") && !EMAIL_REGEX.test(username)) {
      nextErrors.username = "Enter a valid email address";
    }

    if (!password) {
      nextErrors.password = "Password is required";
    } else if (password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) return;
    console.log("Form is valid, submitting:", { username, password });
  };

  const handleGoogleLogin = async () => {
    setGoogleError(null);
    setGoogleLoading(true);
    try {
      await signInWithGoogle();
      navigate("/profile");
    } catch (err) {
      setGoogleError(
        err instanceof Error ? err.message : "Google sign-in failed",
      );
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: { xs: 2, md: 4 },
      }}
    >
      <Grid
        container
        spacing={4}
        sx={{ maxWidth: 1200, width: "100%", alignItems: "stretch" }}
      >
        {/* Left: form */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack
            justifyContent="center"
            sx={{ height: "100%", maxWidth: 420, mx: "auto", py: { xs: 2, md: 0 } }}
            spacing={3}
          >
            <Box>
              <Typography variant="h3" fontWeight={600} gutterBottom textAlign={{xs: "center", md: "center"}}>
                Welcome back!
              </Typography>
              <Typography variant="body2" color="text.secondary" textAlign={{xs: "center", md: "center"}}>
                Simplify your workflow and boost your productivity with
                Tuga's App. Get started for free.
              </Typography>
            </Box>

            {googleError && <Alert severity="error">{googleError}</Alert>}

            <Box component="form" onSubmit={handleSubmit} noValidate>
              <Stack spacing={2.5}>
                <TextField
                  fullWidth
                  label="Username"
                  placeholder="Username or email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  error={Boolean(errors.username)}
                  helperText={errors.username}
                />
                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={Boolean(errors.password)}
                  helperText={errors.password}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword((s) => !s)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />

                <Box textAlign="right">
                  <Link href="#" underline="hover" variant="body2" color="text.secondary">
                    Forgot Password?
                  </Link>
                </Box>

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  sx={{ bgcolor: "#111111", "&:hover": { bgcolor: "#000000" } }}
                >
                  Login
                </Button>
              </Stack>
            </Box>

            <Stack direction="row" alignItems="center" spacing={2}>
              <Divider sx={{ flex: 1 }} />
              <Typography variant="body2" color="text.secondary">
                or continue with
              </Typography>
              <Divider sx={{ flex: 1 }} />
            </Stack>

            <Stack direction="row" spacing={2} justifyContent="center">
              <IconButton
                onClick={handleGoogleLogin}
                disabled={googleLoading}
                sx={{
                  bgcolor: "#111111",
                  color: "#fff",
                  "&:hover": { bgcolor: "#000" },
                  width: 48,
                  height: 48,
                }}
                aria-label="Sign in with Google"
              >
                <GoogleIcon fontSize="small" />
              </IconButton>
              <IconButton
                sx={{
                  bgcolor: "#111111",
                  color: "#fff",
                  "&:hover": { bgcolor: "#000" },
                  width: 48,
                  height: 48,
                }}
                aria-label="Sign in with Apple"
              >
                <AppleIcon fontSize="small" />
              </IconButton>
              <IconButton
                sx={{
                  bgcolor: "#111111",
                  color: "#fff",
                  "&:hover": { bgcolor: "#000" },
                  width: 48,
                  height: 48,
                }}
                aria-label="Sign in with Facebook"
              >
                <FacebookIcon fontSize="small" />
              </IconButton>
            </Stack>

            <Typography variant="body2" textAlign="center" color="text.secondary">
              Not a member?{" "}
              <Link href="#" underline="hover" sx={{ color: "#7CC49A", fontWeight: 600 }}>
                Register now
              </Link>
            </Typography>
          </Stack>
        </Grid>

        {/* Right: illustration */}
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{ display: { xs: "none", md: "block" }, minHeight: 560 }}
        >
          <IllustrationPanel />
        </Grid>
      </Grid>
    </Box>
  );
}
