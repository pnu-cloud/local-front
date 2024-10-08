import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Divider,
  List,
  Box,
  Stack,
  ListItem,
  ListItemText,
} from '@mui/material';
import PropTypes from 'prop-types';
import { LOCAL_COLOR } from '../../constants/localTheme';
import ApplyModal from '../Modal/ApplyModal';
import { useParams, useNavigate } from 'react-router-dom';
import CompanyAPI from '../../APIs/CompanyAPI';
import { NavigateNext } from '@mui/icons-material';

const CustomListItem = ({ primaryText, secondaryText }) => {
  return (
    <ListItem sx={{ display: 'list-item', padding: 1, pl: 0 }}>
      <ListItemText
        primary={
          <Typography sx={{ fontSize: 18 }}>
            <strong>{primaryText}</strong>
            {secondaryText}
          </Typography>
        }
      />
    </ListItem>
  );
};

const RecruitSection = (jobId) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [jsonData, setJsonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { regionSearch } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await CompanyAPI(jobId); // 비동기 함수의 결과를 동기적으로 기다림
        setJsonData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // 로딩 상태 종료
      }
    };
    fetchData();
  }, [regionSearch]);
  console.log(jsonData);
  if (loading) {
    return <div>loading</div>; // 로딩 중일 때 표시할 컴포넌트
  }
  if (!loading && jsonData) {
    console.log(jsonData);
    return (
      <Card sx={{ width: 700, margin: 'auto', mt: 5 }}>
        <CardContent sx={{ paddingBottom: 0 }}>
          <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: 22,
                color: LOCAL_COLOR.green,
                borderLeft: '3px solid',
                borderLeftColor: LOCAL_COLOR.green,
                paddingLeft: 1,
              }}
            >
              {jsonData.category} {jsonData.local}
            </Typography>
            <Button
              sx={{
                width: 115,
                height: 46,
                borderRadius: 10,
                fontSize: 18,
                color: '#8A8A8A',
                fontWeight: 700,
                backgroundColor: '#FAFAFA',
              }}
            >
              목록으로
            </Button>
          </Stack>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: 24,
              marginTop: 1,
              marginBottom: 1,
            }}
          >
            {jsonData.title}
          </Typography>
          <Stack direction="row" spacing={2}>
            <Typography variant="body2" color="textSecondary">
              {jsonData.writer}
            </Typography>
          </Stack>
        </CardContent>
        <Divider sx={{ my: 2 }} />
        <CardMedia
          component="img"
          sx={{ width: '100%', height: 250, backgroundColor: '#e0e0e0' }}
          image={jsonData.imageUrl}
          alt="닭갈비 이미지"
        />
        <CardContent sx={{ paddingBottom: 0 }}>
          <List sx={{ listStyleType: 'disc', pl: 4 }}>
            {jsonData.description}

            <CustomListItem primaryText="업무:  " secondaryText=" 닭갈비집 서빙 알바" />
            <CustomListItem primaryText="월급:  " secondaryText=" XX만원 (기타 고려사항)" />
            <CustomListItem primaryText="근무표" />
          </List>
          <Box sx={{ bgcolor: '#f9f9f9', borderRadius: 1, p: 2, mb: 2 }}>
            <CardMedia component="img" height="340" image={jsonData.scheduleImageUrl} alt="근무표" />
          </Box>
          <List sx={{ listStyleType: 'disc', pl: 4 }}>
            <CustomListItem primaryText="우대사항: " secondaryText="요리사 관련 자격증" />
            <CustomListItem primaryText="기타: " secondaryText=" 4대 보험" />
          </List>
        </CardContent>
        <CardContent sx={{ marginTop: 0 }}>
          <Button
            onClick={handleClickOpen}
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: '#F9E088',
              color: 'black',
              fontSize: 18,
              fontWeight: 700,
              height: 42,
              borderRadius: 4,
              boxShadow: 'none',

              '&:hover': {
                backgroundColor: '#F9E088',
                boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            지원하기
          </Button>
          <ApplyModal open={open} handleClose={handleClose} />
        </CardContent>
      </Card>
    );
  }
};

CustomListItem.propTypes = {
  primaryText: PropTypes.string.isRequired,
  secondaryText: PropTypes.string,
};

export default RecruitSection;
