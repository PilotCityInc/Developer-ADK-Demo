export default interface MongoDoc {
  data: {
    adks: Record<string, any>[];
    programDesc: string;
    programName: string;
  };
  update: () => Promise<any>;
  changeStream: any;
}
