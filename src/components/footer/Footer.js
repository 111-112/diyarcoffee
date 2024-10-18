import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  useTheme,
  useMediaQuery,
  Collapse,
} from "@mui/material";
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Phone,
  Email,
  LocationOn,
  ExpandMore,
  ExpandLess,
} from "@mui/icons-material";

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [expandedSection, setExpandedSection] = React.useState(null);

  const handleExpand = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const FooterSection = ({ title, children, section }) => (
    <Grid item xs={12} sm={6} md={4}>
      <Box
        onClick={() => isMobile && handleExpand(section)}
        sx={{ cursor: isMobile ? "pointer" : "default" }}
      >
        <Typography
          variant="h6"
          gutterBottom
          display="flex"
          alignItems="center"
        >
          {title}
          {isMobile &&
            (expandedSection === section ? <ExpandLess /> : <ExpandMore />)}
        </Typography>
      </Box>
      <Collapse in={!isMobile || expandedSection === section}>
        {children}
      </Collapse>
    </Grid>
  );

  return (
    <Box
      component="footer"
      sx={{
        py: { xs: 2, sm: 6 },
        borderTopLeftRadius: { xs: 16, sm: 32 },
        borderTopRightRadius: { xs: 16, sm: 32 },
        boxShadow: 3,
      }}
      style={{ backgroundColor: "#a27356", color: "#ffffff" }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={{ xs: 1, md: 4 }}
          justifyContent="space-between"
        >
          <FooterSection
            style={{ fontFamily: "inherit" }}
            title="درباره ما"
            section="about"
          >
            <Typography
              variant="body2"
              style={{ fontFamily: "inherit" }}
              sx={{ mb: 2 }}
            >
              ما یک شرکت نوآور هستیم که به ارائه راه‌حل‌های خلاقانه متعهد است.
            </Typography>
          </FooterSection>

          <FooterSection
            style={{ fontFamily: "inherit" }}
            title="لینک‌های مفید"
            section="links"
          >
            <Box display="flex" flexDirection="column">
              <Link
                href="#"
                color="inherit"
                sx={{ mb: 1, "&:hover": { color: "secondary.main" } }}
              >
                صفحه اصلی
              </Link>
              <Link
                href="#"
                color="inherit"
                sx={{ mb: 1, "&:hover": { color: "secondary.main" } }}
              >
                خدمات
              </Link>
              <Link
                href="#"
                color="inherit"
                style={{ fontFamily: "inherit" }}
                sx={{ mb: 1, "&:hover": { color: "secondary.main" } }}
              >
                تماس با ما
              </Link>
              <Link
                href="#"
                color="inherit"
                sx={{ "&:hover": { color: "secondary.main" } }}
              >
                سوالات متداول
              </Link>
            </Box>
          </FooterSection>

          <FooterSection
            style={{ fontFamily: "inherit" }}
            title="تماس با ما"
            section="contact"
          >
            <Box display="flex" flexDirection="column">
              <Box display="flex" alignItems="center" mb={1}>
                <Phone fontSize="small" sx={{ mr: 1 }} />
                <Typography style={{ fontFamily: "inherit" }} variant="body2">
                  ۰۲۱-۱۲۳۴۵۶۷۸
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mb={1}>
                <Email fontSize="small" sx={{ mr: 1 }} />
                <Typography style={{ fontFamily: "inherit" }} variant="body2">
                  info@example.com
                </Typography>
              </Box>
              <Box display="flex" alignItems="flex-start">
                <LocationOn fontSize="small" sx={{ mr: 1, mt: 0.3 }} />
                <Typography style={{ fontFamily: "inherit" }} variant="body2">
                  تهران، خیابان ولیعصر، پلاک ۱۲۳
                </Typography>
              </Box>
            </Box>
          </FooterSection>
        </Grid>

        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems="center"
          mt={isMobile ? 2 : 4}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: { xs: 1, sm: 0 } }}
          >
            © {new Date().getFullYear()} شرکت نمونه. تمامی حقوق محفوظ است.
          </Typography>
          <Box>
            {[Facebook, Twitter, Instagram, LinkedIn].map((network) => (
              <IconButton
                key={network}
                color="inherit"
                aria-label={network}
                size={isMobile ? "small" : "medium"}
              >
                {React.createElement(eval(network))}
              </IconButton>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
