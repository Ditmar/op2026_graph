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
    public addEdge(sourceLabel: string, destinationLabel: string): void {
        const sourceVertex = this.vertexMap.get(sourceLabel);
        const destinationVertex = this.vertexMap.get(destinationLabel);
        if (sourceVertex && destinationVertex) {
            const edge = new Edge(sourceVertex, destinationVertex);
            sourceVertex.addEdge(edge);
        }
    }
    public addBidirectionalEdge(sourceLabel: string, destinationLabel: string): void {
        this.addEdge(sourceLabel, destinationLabel);
        this.addEdge(destinationLabel, sourceLabel);
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
    private prim(): void {
        const noConnectedList: Vertex[] = [];
        const connectedList: Vertex[] = [];
        for (const vertex of this.vertexMap.values()) {
            noConnectedList.push(vertex);
        }
        const startVertex = noConnectedList.shift();
        if (!startVertex) {
            console.log("Graph is empty.");
            return;
        }
        connectedList.push(startVertex);
        while (noConnectedList.length > 0) {
            let minEdge: Edge | null = null;
            let minWeight = Infinity;
            for (const connectedVertex of connectedList) {
                for (const edge of connectedVertex.getEdges()) {
                    const neighbor = edge.getDestination();
                    if (noConnectedList.includes(neighbor) && edge.getWeight() < minWeight) {
                        minWeight = edge.getWeight();
                        minEdge = edge;
                    }
                }
            }
            if (minEdge) {
                const neighbor = minEdge.getDestination();
                connectedList.push(neighbor);
                noConnectedList.splice(noConnectedList.indexOf(neighbor), 1);
                console.log(`Added edge from ${minEdge.getSource().getLabel()} to ${neighbor.getLabel()} with weight ${minEdge.getWeight()}`);
            } else {
                console.log("No more edges to add. Graph may be disconnected.");
                break;
            }
        }
        
    }
}
export default Graph;