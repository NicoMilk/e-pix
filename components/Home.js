import { Layout, Card } from '@ui-kitten/components';
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';

const Home = () => {
  const [homePosts, setPosts] = useState([]);
  const [fix, setFix] = useState(true);

  const getPictures = () => {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', 'Client-ID 546c25a59c58ad7');

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };

    fetch(
      'https://api.imgur.com/3/gallery/hot/?showViral=false&mature=false&album_previews=false',
      requestOptions
    )
      .then((Response) => Response.json())
      .then((result) => {
        let res = [];
        result.data.forEach((post) => {
          let tmp = {};
          tmp.postId = post.id;
          tmp.title = post.title;
          tmp.favorite = post.favorite;
          tmp.links = [];
          let arr = [];
          if (post.images && Array.isArray(post.images)) {
            post.images.forEach((picture) => {
              arr.push({
                pictureId: picture.id,
                link: picture.link,
                type: picture.type,
              });
            });
            tmp.links = arr;
          } else {
            if (true || post.link) {
              arr.push({
                pictureId: post.id,
                link: post.link,
                type: post.type,
              });
            }
            tmp.links = arr;
          }
          res.push(tmp);
        });

        setPosts(res);
        // console.log('PLOP :', res);
      });
    // .catch(error => console.error('Error :', error))
  };

  useEffect(() => {
    getPictures();
  }, [fix]);

  const cardHeader = (props) => (
    <View {...props}>
      <Text style={styles.header}>{props.title}</Text>
    </View>
  );

  return (
    <Layout>
      <FlatList
        keyExtractor={(item) => item.postId}
        data={homePosts}
        renderItem={({ item }) => (
          <Card
            style={styles.card}
            header={cardHeader.bind(this, { title: item.title })}
          >
            {item.links.map((link) => {
              return (
                <>
                  <Image
                    key={link.pictureId}
                    resizeMode="center"
                    source={{
                      width: 370,
                      height: 500,
                      uri: link.link,
                    }}
                  />
                </>
              );
            })}
          </Card>
        )}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header: {
    fontSize: 20,
    marginLeft: 5,
  },
  card: {
    flex: 1,
    margin: 2,
  },
  // footerContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'flex-end',
  // },
  // footerControl: {
  //   marginHorizontal: 2,
  // },
});

export default Home;
