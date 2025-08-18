export interface UnsplashPhoto {
  id: string;
  created_at: string;
  width: number;
  height: number;
  color: string;
  likes: number;
  user: {
    name: string;
    username: string;
    profile_image: {
      small: string;
    };
  };
  urls: {
    small: string;
    regular: string;
    full: string;
  };
  links: {
    html: string;
  };
}

export interface IModalSliderProps {
  photos: UnsplashPhoto[];
  currentIndex: number;
  onClose: () => void;
}

export interface IModalCardProps {
  photo: {
    urls: {
      regular: string;
    };
    user: {
      name: string;
    };
    likes: number;
  };
  onClose: () => void;
}
