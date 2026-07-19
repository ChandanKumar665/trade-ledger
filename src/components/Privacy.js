import Navbar from "./utils/Navbar";

export default function Privacy() {
    return (
        <>
            <Navbar />
            <div className="mb-2">
                <div class="card shadow-sm border-0">
                    <div class="card-body p-5">

                        <h1 class="display-5 fw-bold mb-2">Privacy Policy</h1>
                        <p class="text-muted">Last Updated: July 19, 2026</p>

                        <p>
                            Welcome to <strong>Trade Ledger</strong>. We value your privacy and are committed to
                            protecting your personal information. This Privacy Policy explains how we collect,
                            use, store, and safeguard your information when you use our platform.
                        </p>

                        <hr />

                        <section class="mb-5">
                            <h3 class="fw-semibold mb-3">1. Information We Collect</h3>

                            <p>We may collect the following information:</p>

                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">Name and email address</li>
                                <li class="list-group-item">User profile information</li>
                                <li class="list-group-item">Trading accounts and journal entries</li>
                                <li class="list-group-item">Trade history and performance data</li>
                                <li class="list-group-item">Trade notes, tags and screenshots</li>
                                <li class="list-group-item">Browser, device and operating system details</li>
                                <li class="list-group-item">IP address and login activity</li>
                                <li class="list-group-item">Cookies and usage analytics</li>
                            </ul>
                        </section>

                        <section class="mb-5">
                            <h3 class="fw-semibold mb-3">2. How We Use Your Information</h3>

                            <p>Your information is used to:</p>

                            <ul>
                                <li>Provide and maintain Trade Ledger.</li>
                                <li>Authenticate your account.</li>
                                <li>Store and manage your trading journal.</li>
                                <li>Generate trading analytics and reports.</li>
                                <li>Improve application performance and user experience.</li>
                                <li>Respond to support requests.</li>
                                <li>Protect against fraud and unauthorized access.</li>
                                <li>Send important account and security notifications.</li>
                            </ul>

                            <div class="alert alert-info mt-3">
                                We do <strong>not sell</strong> your personal information to third parties.
                            </div>
                        </section>

                        <section class="mb-5">
                            <h3 class="fw-semibold mb-3">3. Trading Data</h3>

                            <p>Trade Ledger stores information that you voluntarily enter, including:</p>

                            <div class="row">
                                <div class="col-md-6">
                                    <ul>
                                        <li>Entry & Exit Price</li>
                                        <li>Profit & Loss</li>
                                        <li>Position Size</li>
                                        <li>Trading Instrument</li>
                                    </ul>
                                </div>

                                <div class="col-md-6">
                                    <ul>
                                        <li>Trading Strategy</li>
                                        <li>Trade Notes</li>
                                        <li>Screenshots</li>
                                        <li>Performance Metrics</li>
                                    </ul>
                                </div>
                            </div>

                            <p>
                                This information is used only to provide journaling, reporting,
                                analytics and performance tracking features.
                            </p>
                        </section>

                        <section class="mb-5">
                            <h3 class="fw-semibold mb-3">4. Cookies</h3>

                            <p>We use cookies to:</p>

                            <ul>
                                <li>Keep you logged in.</li>
                                <li>Remember your preferences.</li>
                                <li>Improve application performance.</li>
                                <li>Measure platform usage.</li>
                                <li>Enhance security.</li>
                            </ul>
                        </section>

                        <section class="mb-5">
                            <h3 class="fw-semibold mb-3">5. Data Security</h3>

                            <p>We implement appropriate security measures including:</p>

                            <ul>
                                <li>HTTPS encryption</li>
                                <li>Encrypted passwords</li>
                                <li>Role-based access control</li>
                                <li>Secure authentication</li>
                                <li>Routine security updates</li>
                            </ul>

                            <div class="alert alert-warning">
                                While we strive to protect your information, no method of internet
                                transmission or electronic storage is completely secure.
                            </div>
                        </section>

                        <section class="mb-5">
                            <h3 class="fw-semibold mb-3">6. Data Retention</h3>

                            <p>
                                We retain your information while your account is active and only
                                for as long as necessary to provide our services, comply with legal
                                obligations and resolve disputes.
                            </p>
                        </section>

                        <section class="mb-5">
                            <h3 class="fw-semibold mb-3">7. Third-Party Services</h3>

                            <p>
                                We may use trusted third-party providers for services including:
                            </p>

                            <ul>
                                <li>Cloud Hosting</li>
                                <li>Authentication</li>
                                <li>Email Notifications</li>
                                <li>Analytics</li>
                                <li>Error Monitoring</li>
                            </ul>
                        </section>

                        <section class="mb-5">
                            <h3 class="fw-semibold mb-3">8. Your Rights</h3>

                            <p>You may have the right to:</p>

                            <ul>
                                <li>Access your personal information.</li>
                                <li>Update or correct your data.</li>
                                <li>Request deletion of your account.</li>
                                <li>Download your data.</li>
                                <li>Withdraw consent where applicable.</li>
                            </ul>
                        </section>

                        <section class="mb-5">
                            <h3 class="fw-semibold mb-3">9. Children's Privacy</h3>

                            <p>
                                Trade Ledger is intended for individuals aged 18 years or older.
                                We do not knowingly collect information from children.
                            </p>
                        </section>

                        <section class="mb-5">
                            <h3 class="fw-semibold mb-3">10. Changes to this Policy</h3>

                            <p>
                                We may update this Privacy Policy periodically. Any changes will be
                                reflected by updating the "Last Updated" date at the top of this page.
                            </p>
                        </section>

                        <section class="mb-5">
                            <h3 class="fw-semibold mb-3">11. Contact Us</h3>

                            <p>
                                If you have questions regarding this Privacy Policy or your personal
                                information, please contact us through the support section within
                                Trade Ledger.
                            </p>
                        </section>

                        <hr />

                        <div class="alert alert-secondary mb-0">
                            <strong>Disclaimer:</strong><br />
                            Trade Ledger is a trading journal and analytics platform designed to help
                            users record and analyze their trades. It does not provide financial,
                            investment, legal or tax advice. All trading decisions are the sole
                            responsibility of the user.
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}