import { Event } from '../db/event';

export class APIClient {
  private baseUrl: string = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://127.0.0.1:3000';

  public fetch(path: string): Promise<Response> {
    return fetch(new URL(path, this.baseUrl).toString());
  }

  public async getEvents(): Promise<Event[]> {
    const res = await this.fetch('/api/events');
    const events = await res.json();
    return events;
  }

  public async getEvent(id: Event['id']): Promise<Event | undefined> {
    const events = await this.getEvents();
    const event = events.find((item) => item.id === id);

    return event;
  }
}
