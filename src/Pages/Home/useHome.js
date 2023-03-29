import {useEffect, useState} from 'react';

export default function useHome() {
  const randomFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const [loading, setLoading] = useState({
    refresh: false,
  });

  const [modal, setModal] = useState({
    popup: true,
  });

  const [data, setData] = useState({
    popup: {
      id: 1,
      image: 'https://via.placeholder.com/500?text=Monday+Devotion',
    },

    header: {
      id: 1,
      cover: 'https://via.placeholder.com/500x200?text=Cover+Image',
      name: 'John Doe',
      notification: randomFromInterval(0, 50),
    },

    information: [
      {
        id: 'activities',
        title: 'Kegiatanku',
        done: randomFromInterval(0, 50),
        total: randomFromInterval(50, 1000),
      },
      {
        id: 'services',
        title: 'Pelayananku',
        done: randomFromInterval(0, 50),
        total: randomFromInterval(50, 1000),
      },
      {
        id: 'bookmarks',
        title: 'Bookmark-ku',
        done: randomFromInterval(0, 50),
        total: 0,
      },
    ],
    menu: Array(15)
      .fill(0)
      .map((_, index) => ({
        id: index + 1,
        title: `Menu dengan judul ${index + 1}`,
        image: 'https://via.placeholder.com/500?text=Menu+Image',
      })),

    now_playing: {
      id: 1,
      title: 'Kegiatan sedang berlangsung',
      youtube: 'https://www.youtube.com/embed/9bZkp7q19f0',
    },

    category: Array(5)
      .fill(0)
      .map((_, index) => ({
        id: index + 1,
        pretitle: 'Gods will in',
        title:
          index == 0
            ? 'Family'
            : index == 1
            ? 'Marriage'
            : index == 2
            ? 'Wedding'
            : index == 3
            ? 'Parent'
            : 'Youth Gen',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquam massa, eget aliquam nisl nunc vel nisl. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquam massa, eget aliquam nisl nunc vel nisl.',
        image: 'https://via.placeholder.com/350?text=Category+Image',
      })),

    event_recommended: Array(5)
      .fill(0)
      .map((_, index) => ({
        id: index + 1,
        thumbnail: 'https://via.placeholder.com/500?text=Event+Thumbnail',
        title: 'Event Title',
      })),
  });

  const handleLoading = (key, value) => {
    setLoading(prev => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const handleData = (key, value) => {
    setData(prev => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const handleModal = (key, value) => {
    setModal(prev => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  useEffect(() => {
    console.log('Home:useEffect');
    console.log('Home:useEffect:modal', modal);

    return () => {
      console.log('Home:useEffect:unmount');
    };
  }, [modal]);

  return {
    loading,
    data,
    modal,
    handleLoading,
    handleData,
    handleModal,
  };
}
