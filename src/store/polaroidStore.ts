export type PolaroidData = {
  x: number;
  y: number;
  visible: boolean;
  photoIndex: number;
};

type Listener = (data: PolaroidData) => void;

class PolaroidStore {
  private data: PolaroidData = { x: -9999, y: -9999, visible: false, photoIndex: 0 };
  private listeners: Set<Listener> = new Set();

  set(partialData: Partial<PolaroidData>) {
    this.data = { ...this.data, ...partialData };
    this.listeners.forEach((listener) => listener(this.data));
  }

  get() {
    return this.data;
  }

  subscribe(listener: Listener) {
    this.listeners.add(listener);
    listener(this.data);
    return () => this.listeners.delete(listener);
  }
}

export const polaroidStore = new PolaroidStore();
