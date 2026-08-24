import Edge from "./Edge";

class Vertex {
    private label: string;
    private visited: boolean;
    private edges: Edge[];
    constructor(label: string) {
        this.label = label;
        this.visited = false;
        this.edges = [];
    }
    public addEdge(edge: Edge): void {
        this.edges.push(edge);
    }
    public markVisited(): void {
        this.visited = true;
    }
    public getLabel(): string {
        return this.label;
    }
    public isVisited(): boolean {
        return this.visited;
    }
    public getEdges(): Edge[] {
        return this.edges;
    }
}
export default Vertex;