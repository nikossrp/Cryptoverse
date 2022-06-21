import React, {useState, useEffect} from 'react';
import {Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';

import Loader from './Loader';

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News'

const { Text, Title } = Typography;
const { Option } = Select;


const News = ({ simplified }) => {
  
  const [newsCategory, setNewsCategory] = useState('');
  
  
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 6 : 120 });
  const { data } = useGetCryptosQuery(100); // 100 are the cryptocurrencies which will return


  // if (!cryptoNews?.value) return 'Loading...';
  // console.log(data);
  if (isFetching) return <Loader/>;



  return (
    <Row gutter={[24, 24]}>
      {
        !simplified && (
          <Col span={24}>
            <Select
              showSearch
              className="select-news"
              placeholder="Select a Crypto" 
              optionFilterProp="children"
              onChange={(value) => setNewsCategory(value)}
              filterOption={(input, option) =>option.props.children[1].toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              <Option value="Cryptocurrency">Cryptocurrency</Option>
              {
                data?.data?.coins.map((coin) => <Option value={coin?.name}> {coin?.name} </Option>)
              }
            </Select>
          </Col>
        )
      }

      {cryptoNews.value.map((news, i) => (
        <Col xs={24} sm={12} lg={8} className="news-card" key={i}>
          <Card hoverable className="news-card" >
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}> {news.name} </Title>
                <img src={news?.image?.thumbnail?.contentUrl || demoImage} style={{maxWidth:'200px', maxHeight:'100px'}} alt="news" />
              </div>
              <p>
                {(news.description > 10)
                  ?  `${news.description.substring(0, 100)}...` 
                  : news.description
                }
              </p>
              <div className="provider-container">
                <div>
                  <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="news"/>
                  <Text className="provider-name">{news.provider[0]?.name}</Text>
                </div>
                <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
              </div>

            </a>
          </Card>

        </Col>
      ))}

    </Row>
  )
}

export default News;