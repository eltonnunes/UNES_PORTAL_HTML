export class Video {
  constructor(
                public UNV_ID_VIDEOS: number,
                public UNV_TX_TITULO: string,
                public UNV_TX_DESCRICAO: string,
                public UNV_NR_VIEW: number,
                public UNV_NR_LIKE: number,
                public UNV_DT_DATA: Date,
                public UNT_ID_TAG: number,
                public UNV_TX_HASH:	string
              ) { }
}
