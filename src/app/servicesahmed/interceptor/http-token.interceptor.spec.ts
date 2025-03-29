import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';  // Import for mocking HTTP requests
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor } from './http-token.interceptor';  // Correct path to your interceptor

describe('HttpTokenInterceptor', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Mock HTTP requests
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpTokenInterceptor,
          multi: true, // Allow multiple interceptors
        },
      ],
    });

    // Inject HttpClient and HttpTestingController to mock and track HTTP requests
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Ensure that there are no outstanding requests after each test
    httpTestingController.verify();
  });

  it('should be created', () => {
    const interceptor = TestBed.inject(HttpTokenInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('should add Authorization header to the request', () => {
    const dummyRequest = { some: 'data' };

    // Make an HTTP GET request
    httpClient.get('/test').subscribe();

    // Mock and capture the request
    const req = httpTestingController.expectOne('/test');

    // Assert that the request includes the Authorization header (assuming it's a Bearer token)
    expect(req.request.headers.has('Authorization')).toEqual(true);
    expect(req.request.headers.get('Authorization')).toContain('Bearer ');  // Modify the expected token format as needed

    // Respond with a mock response
    req.flush(dummyRequest);
  });
});
