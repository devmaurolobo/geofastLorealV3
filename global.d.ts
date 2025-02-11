declare global {
  namespace NodeJS {
    interface Global {
      lastVideo: {
        id: string;
        status: string;
        url: string;
      };
    }
  }

  var lastVideo: {
    id: string;
    status: string;
    url: string;
  };
}

export {}; 