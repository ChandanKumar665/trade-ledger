import './index.css';

export default function UnderConstruction(props) {

    return (
        <>
            <section class="coming-section mb-1">
                <div class="coming-card text-center mx-auto">
                    <h1>
                        Launching Soon 🚀
                    </h1>

                    <p class="lead mt-4">
                        TradeMemo is a modern trading journal designed to help traders
                        track every trade, analyze performance, improve discipline,
                        and become consistently profitable.

                    </p>
                    <div class="row mt-5 g-4">
                        <div class="col-md-4">
                            <div class="feature">
                                <div class="icon">
                                    <i class="bi bi-journal-text"></i>
                                </div>
                                <h5 class="mt-3">

                                    Trade Journal

                                </h5>
                                <p class="small text-secondary">

                                    Record every trade with notes and screenshots.

                                </p>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="feature">

                                <div class="icon">

                                    <i class="bi bi-graph-up-arrow"></i>

                                </div>

                                <h5 class="mt-3">

                                    Analytics

                                </h5>

                                <p class="small text-secondary">

                                    Win rate, RR ratio, expectancy and more.

                                </p>

                            </div>

                        </div>

                        <div class="col-md-4">

                            <div class="feature">

                                <div class="icon">

                                    <i class="bi bi-calendar-check"></i>

                                </div>

                                <h5 class="mt-3">

                                    Calendar P&L

                                </h5>

                                <p class="small text-secondary">

                                    Review your trading performance day by day.

                                </p>

                            </div>

                        </div>

                    </div>

                    <div class="mt-5">

                        <a href="#" class="btn launch">

                            Launching Soon

                        </a>
                    </div>
                </div>
            </section>
        </>
    )
}