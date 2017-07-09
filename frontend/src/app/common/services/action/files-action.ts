export module FilesAction {

  export interface GetAllAreas {
    areas: string[];
  }

  export interface LsResult {
    nodes: Node[];
  }

  export interface Node {
    name: string;
    nodeId: string;
    type: string;
    updateDateTime: number[];
    createDateTime: number[];
  }

}
