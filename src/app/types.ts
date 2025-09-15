export interface IUnsplashPhoto {
  id: string;
  likes: number;
  user: {
    name: string;
    profile_image: {
      small: string;
    };
  };
  urls: {
    small: string;
    regular?: string;
  };
}

export interface IPhotoCardProps {
  photo: IUnsplashPhoto;
  openModal: (id: string) => void;
}

export interface IGalleryProps {
  photos: IUnsplashPhoto[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  openModal: (id: string) => void;
}
