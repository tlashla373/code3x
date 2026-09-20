import { useEffect, useState } from "react";
import { Box, Stack, Typography, LinearProgress } from "@mui/material";

const illustrations = [
  { src: "/Meditation_01.png", alt: "Person meditating" },
  { src: "/Yoga_02.svg", alt: "Person practicing yoga" },
  { src: "/Stability_03.svg", alt: "Person using a stability ball" },
];


export default function IllustrationPanel() {
  const [activeIllustration, setActiveIllustration] = useState(0);

  useEffect(() => {
    const slideshowTimer = window.setInterval(() => {
      setActiveIllustration((current) => (current + 1) % illustrations.length);
    }, 6000);

    return () => window.clearInterval(slideshowTimer);
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        height: "100%",
        width: "100%",
        borderRadius: 5,
        bgcolor: "#EAF3EA",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        px: 4,
        py: 6,
      }}
    >
      {/* Decorative avatar bubbles */}
      <Box
        sx={{
          position: "absolute",
          top: 100,
          left: 50,
          width: 80,
          height: 80,
          borderRadius: "50%",
          bgcolor: "#CFE8D8",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 24,
        }}
      >
        <Box
          component="img"
          src="/small_pic_01.png"
          alt="Team member"
          sx={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: 250,
          right: 48,
          width: 80,
          height: 80,
          borderRadius: "50%",
          bgcolor: "#111111",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 26,
        }}
      >
        <Box
          component="img"
          src="/small_pic_02.svg"
          alt="Team member"
          sx={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </Box>

      {/* Central illustration slideshow */}
      <Box
        sx={{
          width: "min(100%, 360px)",
          height: 350,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bottom: 320,
        }}
      >
        <Box
          component="img"
          src={illustrations[activeIllustration].src}
          alt={illustrations[activeIllustration].alt}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </Box>

      {/* Floating task card */}
      <Box
        sx={{
          position: "absolute",
          bottom: 180,
          left: 32,
          bgcolor: "#ffffff",
          borderRadius: 3,
          border: "1px solid #0f0f0f",
          p: 2,
          width: 200,
          boxShadow: "0 12px 28px rgba(0,0,0,0.08)",
        }}
      >
        <Typography variant="subtitle2" fontWeight={700} fontSize={18}>
          Canva Design
        </Typography>
        <Typography variant="caption" color="text.secondary" fontSize={14}>
          10 Task
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1.5 }}>
          <Box
            sx={{
              px: 1.5,
              py: 0.5,
              borderRadius: 999,
              bgcolor: "#F0F0F0",
              fontSize: 14,
            }}
          >
            Design
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ position: "relative", width: 50, height: 50 }}>
            <svg viewBox="0 0 36 36" width="45" height="45">
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#eee"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831"
                fill="none"
                stroke="#7CC49A"
                strokeWidth="3"
                strokeDasharray="84, 100"
              />
            </svg>
            <Typography
              sx={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 10,
                fontWeight: 700,
              }}
            >
              84%
            </Typography>
          </Box>
        </Stack>
      </Box>

      <Stack alignItems="center" spacing={1} sx={{ mt: "auto" }}>
        <Stack direction="row" spacing={0.5}>
          {illustrations.map((illustration, index) => (
            <Box
              component="button"
              type="button"
              key={illustration.src}
              aria-label={`Show ${illustration.alt}`}
              onClick={() => setActiveIllustration(index)}
              sx={{
                border: 0,
                padding: 0,
                borderRadius: "50%",
                cursor: "pointer",
                bgcolor: index === activeIllustration ? "#111111" : "#D3D3D3",
                height: index === activeIllustration ? 8 : 8,
                width: index === activeIllustration ? 20 : 8,
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </Stack>
        <Typography variant="h5" fontWeight={500} textAlign="center">
          Make your work easier and organized
          <br /> with <Box component="span" sx={{ fontWeight: 700 }}>Tuga's App</Box>
        </Typography>
      </Stack>
      <LinearProgress sx={{ display: "none" }} />
    </Box>
  );
}
