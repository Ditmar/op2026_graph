import Vertex from "./Vertex";
import Edge from "./Edge";
class Graph {
    private vertexMap: Map<string, Vertex>;
    constructor() {
        this.vertexMap = new Map<string, Vertex>();
    }
    public addVertex(label: string): void {
        const vertex = new Vertex(label);
        this.vertexMap.set(label, vertex);
    }
    public addEdge(sourceLabel: string, destinationLabel: string, weight: number = 0): void {
        const sourceVertex = this.vertexMap.get(sourceLabel);
        const destinationVertex = this.vertexMap.get(destinationLabel);
        if (sourceVertex && destinationVertex) {
            const edge = new Edge(sourceVertex, destinationVertex, weight);
            sourceVertex.addEdge(edge);
        }
    }
    public addBidirectionalEdge(sourceLabel: string, destinationLabel: string, weight: number = 0): void {
        this.addEdge(sourceLabel, destinationLabel, weight);
        this.addEdge(destinationLabel, sourceLabel, weight);
    }
    public getVertex(label: string): Vertex | undefined {
        return this.vertexMap.get(label);
    }
    public BFS(startLabel: string): void {
        const startVertex = this.vertexMap.get(startLabel);
        if (!startVertex) {
            console.log(`Vertex with label ${startLabel} not found.`);
            return;
        }
        const queue: Vertex[] = [];
        startVertex.markVisited();
        queue.push(startVertex);
        while (queue.length > 0) {
            const currentVertex = queue.shift()!;
            console.log(`Visited: ${currentVertex.getLabel()}`);
            for (const edge of currentVertex.getEdges()) {
                const neighbor = edge.getDestination();
                if (!neighbor.isVisited()) {
                    neighbor.markVisited();
                    queue.push(neighbor);
                }
            }
        }
    }
    public DFS(startLabel: string): void {
        const startVertex = this.vertexMap.get(startLabel);
        if (!startVertex) {
            console.log(`Vertex with label ${startLabel} not found.`);
            return;
        }
        this.DFSRecursive(startVertex);
    }
    private DFSRecursive(vertex: Vertex): void {
        vertex.markVisited();
        console.log(`Visited: ${vertex.getLabel()}`);
        for (const edge of vertex.getEdges()) {
            const neighbor = edge.getDestination();
            if (!neighbor.isVisited()) {
                this.DFSRecursive(neighbor);
            }
        }
    }
    // prim
    public  PRIM(startLabel: string): void {
        const startVertex = this.vertexMap.get(startLabel);
        if (!startVertex) {
            console.log(`Vertex with label ${startLabel} not found.`);
            return;
        }
        const connectedList: Vertex[] = [];
        const noConnectedList: Vertex[] = [];
        for (const vertex of this.vertexMap.values()) {
            if (vertex !== startVertex) {
                noConnectedList.push(vertex);
            }
        }
        connectedList.push(startVertex);
        while (noConnectedList.length > 0) {
            const minWeightVertex = this.getTheMinimumVertex(connectedList, noConnectedList);
            if (minWeightVertex) {
                this.findAndRemoveVertex(minWeightVertex, connectedList, noConnectedList);
            } else {
                console.log("No more connected vertices found.");
                break;
            }
            console.log("Connected list ", connectedList.map(v => v.getLabel()));
            console.log("No connected list ", noConnectedList.map(v => v.getLabel()));
        }
    }
    private getTheMinimumVertex(connectedList: Vertex[], noConnectedList: Vertex[]): Vertex | null {
        let minVertex: Vertex | null = null;
        let minWeight = Infinity;
        for (const connectedVertex of connectedList) {
            for (const edge of connectedVertex.getEdges()) {
                const neighbor = edge.getDestination();
                if (noConnectedList.includes(neighbor) && edge.getWeight() < minWeight) {
                    minWeight = edge.getWeight();
                    minVertex = neighbor;
                }
            }
        }
        return minVertex;
    }
    private findAndRemoveVertex(candidateVertex: Vertex, connectedList: Vertex[], noConnectedList: Vertex[]): void {
            connectedList.push(candidateVertex);
            const index = noConnectedList.indexOf(candidateVertex);
            if (index > -1) {
                noConnectedList.splice(index, 1);
            }
    }
    
}
export default Graph;