import moment from "moment";

export const formatDate = (timestamp: number): string => {
    return moment(timestamp).format('DD/MM/YYYY - HH:mm:ss');
  }